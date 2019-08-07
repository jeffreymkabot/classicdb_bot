/**
 * @fileoverview Functions for parsing non API related queries.
 * @author Andreas Kruehlmann
 * @since 1.4.7
 */

import * as discord from "discord.js";

import * as _memes from "../../../memes.json";
import { discord_href, discord_icon, favicon_path } from "../../consts.js";

type MItems = {
    [key: string]: {
        color: number;
        title: string;
        description: string;
        icon: string;
    };
};

type MPlain= {
    [key: string]: string;
};

type MLib = {
    items: MItems;
    plaintext: MPlain;
    alias: MPlain;
    files: MPlain;
};

const memes = _memes as MLib;

/**
 * Finds any item related memes in a message and builds the first response
 * found.
 *
 * @param msg - Message to search.
 * @returns - If meme was found returns the response else undefined.
 */
export function item_meme_response(msg: discord.Message,
                            ): discord.RichEmbed | undefined {
    for (const item_trigger of Object.keys(memes.items)) {
        if (msg.content.toLowerCase().includes(item_trigger)) {
            const found_item = memes.items[item_trigger];
            return new discord.RichEmbed()
                .setColor(found_item.color)
                .setTitle(found_item.title)
                .setDescription(found_item.description)
                .setAuthor("Classic DB Bot",
                           favicon_path,
                           discord_href)
                .setThumbnail(found_item.icon)
                .setFooter("https://discord.gg/mRUEPnp", discord_icon)
                .setURL("https://discord.gg/mRUEPnp");
        }
    }
    return undefined;
}


/**
 * Finds any alias related memes in a message and manipulates the content of the
 * original message to suit the alias.
 *
 * @param msg - Message to search.
 * @returns - Message with manipulated content.
 */
export function alias_meme_response(msg: discord.Message): discord.Message {
    for (const alias of Object.keys(memes.alias)) {
        if (msg.content.toLowerCase().includes(alias)) {
            const found_alias = memes.alias[alias];
            // This could be problematic.
            msg.content = msg.content.toLowerCase().replace(alias, found_alias);
        }
    }
    return msg;
}


/**
 * Finds any plaintext related memes in a message and returns a response string
 * if any were found.
 *
 * @param msg - Message to search.
 * @returns - Message response object.
 */
export function plaintext_meme_response(msg: discord.Message): string {
    for (const plaintext of Object.keys(memes.plaintext)) {
        if (msg.content.toLowerCase() === plaintext) {
            const found_plaintext = memes.plaintext[plaintext];
            return found_plaintext;
        }
    }
    return "";
}

/**
 * Finds any file related memes in a message and returns a message with the file
 * attached if any were found.
 *
 * @param msg - Message to search.
 * @returns - Message response object.
 */
export function file_meme_response(msg: discord.Message): discord.Attachment {
    for (const file_key of Object.keys(memes.files)) {
        if (msg.content.toLowerCase() === file_key) {
            const file_name = memes.files[file_key];
            return new discord.Attachment(`static/${file_name}`);
        }
    }
    return undefined;
}
