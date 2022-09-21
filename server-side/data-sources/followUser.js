import { MongoDataSource } from "apollo-datasource-mongodb";
import { FollowUser } from "../models/followUser";

class FollowUserModel extends MongoDataSource {
  async applyFollowing(followerID, followedID) {
    const followUser = new FollowUser({
      follower: followerID,
      followed: followedID,
    });
    return await followUser.save();
  }

  async applyUnFollowing(followerID, followedID) {
    return await this.model.findOneAndDelete({
      follower: followerID,
      followed: followedID,
    });
  }

  async findCoupleByIDs(followerID, followedID) {
    return await this.model.findOne({
      follower: followerID,
      followed: followedID,
    });
  }
}

export default FollowUserModel;
