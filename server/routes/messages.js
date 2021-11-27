const express = require("express");
const router = express.Router();
const sequenceGenerator = require("./sequenceGenerator");
const Message = require("../models/message");
const Contact = require("../models/contact");

router.get("/", (req, res, next) => {
  Message.find({})
    .populate("sender")
    .then((messages) => {
      res.status(200).json(messages);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "An error occurred",
        error: error,
      });
    });
});

router.post("/", async (req, res, next) => {
  const maxMessageId = sequenceGenerator.nextId("messages");

  const contact = await Contact.findOne({ id: req.body.sender.id });

  console.log(contact);

  const message = new Message({
    id: maxMessageId,
    subject: req.body.subject,
    msgText: req.body.msgText,
    sender: contact._id,
  });

  message
    .save()
    .then(async (createdMessage) => {
      await createdMessage.populate("sender")
      res.status(201).json({
        message: "Message added successfully",
        msg: createdMessage,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Creating a message failed",
        error: error,
      });
    });
});

router.put("/:id", (req, res, next) => {
  Message.findOne({ id: req.params.id })
    .then((message) => {
      message.subject = req.body.subject;
      message.msgText = req.body.msgText;
      message.sender = req.body.sender;

      Message.updateOne({ id: req.params.id }, message)
        .then((result) => {
          res.status(204).json({
            message: "Message updated successfully",
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: "An error occurred",
            error: error,
          });
        });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Message not found.",
        error: { message: "Message not found" },
      });
    });
});

router.delete("/:id", (req, res, next) => {
  Message.findOne({ id: req.params.id })
    .then(() => {
      Message.deleteOne({ id: req.params.id })
        .then(() => {
          res.status(204).json({
            message: "Message deleted successfully",
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: "An error occurred",
            error: error,
          });
        });
    })
    .catch(() => {
      res.status(500).json({
        message: "Message not found.",
        error: { document: "Message not found" },
      });
    });
});

module.exports = router;
