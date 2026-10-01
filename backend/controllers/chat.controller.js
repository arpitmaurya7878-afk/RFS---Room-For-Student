import Conversation from "../model/conversation.model.js";
import Listing from "../model/listing.model.js";
import User from "../model/user.model.js";
import Message from "../model/message.model.js";


export const createConversation = async (req, res) => {
    try {
        let { listingId } = req.body;
        let userId = req.userId;

        let listing = await Listing.findById(listingId);

        if (!listing) {
            return res.status(404).json({
                message: "Listing not found"
            });
        }

        let ownerId = listing.host;

        // User cannot chat with himself
        if (userId.toString() === ownerId.toString()) {
            return res.status(400).json({
                message: "You cannot chat with yourself"
            });
        }

        // Check whether conversation already exists
        let conversation = await Conversation.findOne({
            listing: listingId,
            participants: { $all: [userId, ownerId] }
        });

        // If conversation already exists, return it
        if (conversation) {
            return res.status(200).json(conversation);
        }

        // Create new conversation
        conversation = await Conversation.create({
            listing: listingId,
            participants: [userId, ownerId]
        });

        return res.status(201).json(conversation);

    } catch (error) {
        return res.status(500).json({
            message: `Create conversation error ${error}`
        });
    }
};


export const sendMessage = async (req, res) => {
    try {
        let { conversationId, text } = req.body;
        let userId = req.userId;

        if (!conversationId || !text) {
            return res.status(400).json({
                message: "conversationId and text are required"
            });
        }

        let conversation = await Conversation.findById(conversationId);

        if (!conversation) {
            return res.status(404).json({
                message: "Conversation not found"
            });
        }

        // Check whether the logged-in user belongs to this conversation
        let isParticipant = conversation.participants.some(
            participant => participant.toString() === userId.toString()
        );

        if (!isParticipant) {
            return res.status(403).json({
                message: "You are not a participant in this conversation"
            });
        }

        let message = await Message.create({
            conversation: conversationId,
            sender: userId,
            text: text
        });

        // Update the latest message in conversation
        conversation.lastMessage = text;
        await conversation.save();

        return res.status(201).json(message);

    } catch (error) {
        return res.status(500).json({
            message: `Send message error ${error}`
        });
    }
};


export const getMessages = async (req, res) => {
    try {
        let { conversationId } = req.params;
        let userId = req.userId;

        // Check whether conversation exists
        let conversation = await Conversation.findById(conversationId);

        if (!conversation) {
            return res.status(404).json({
                message: "Conversation not found"
            });
        }

        // Check whether logged-in user belongs to conversation
        let isParticipant = conversation.participants.some(
            participant => participant.toString() === userId.toString()
        );

        if (!isParticipant) {
            return res.status(403).json({
                message: "You are not a participant in this conversation"
            });
        }

        // Get all messages of this conversation
        let messages = await Message.find({
            conversation: conversationId
        }).sort({ createdAt: 1 });

        return res.status(200).json(messages);

    } catch (error) {
        return res.status(500).json({
            message: `Get messages error ${error}`
        });
    }
};

export const getMyConversations = async (req, res) => {
    try {
        let userId = req.userId;

        // Get conversations of the logged-in user
        let conversations = await Conversation.find({
            participants: userId
        })
        .populate("listing")
        .populate("participants", "name email")
        .sort({ updatedAt: -1 });

        return res.status(200).json(conversations);

    } catch (error) {
        return res.status(500).json({
            message: `Get conversations error ${error}`
        });
    }
};