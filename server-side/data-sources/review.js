import { MongoDataSource } from "apollo-datasource-mongodb";

class ReviewModel extends MongoDataSource {
  async addReview(data) {
    const review = new this.model(data);
    await review.save();
  }

  async deleteReviews(ownSkillRef) {
    await this.model.deleteMany({ ownSkill: ownSkillRef });
  }
}

export default ReviewModel;
