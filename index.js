import assert from "node:assert/strict";
import mongoose from "mongoose";

try {
  await mongoose.connect("mongodb://localhost:27017", { dbName: "test" });
} catch (err) {
  console.log(err);
}

mongoose.set("runValidators", true);

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  family: {
    isMarried: {
      type: Boolean,
    },
    hasKids: {
      type: Boolean,
    },
  },
});

const User = mongoose.model("User", userSchema);

async function run() {
  const newUser = await User.create({
    name: "Jake",
    email: "jake@mail.com",
    family: {
      isMarried: true,
      hasKids: true,
    },
  });

  const updatedUser = await User.findByIdAndUpdate(
    newUser._id,
    {
      name: "John",
      email: undefined,
      family: {
        isMarried: false,
        hasKids: undefined,
      },
    },
    { new: true }
  );

  assert.equal(updatedUser.name, "John");
  assert.equal(updatedUser.email, "jake@mail.com");
  assert.equal(updatedUser.family.isMarried, false);
  assert.equal(updatedUser.family.hasKids, undefined); // does not fail
  assert.equal(updatedUser.family.hasKids, true); / // fails
}

run();
