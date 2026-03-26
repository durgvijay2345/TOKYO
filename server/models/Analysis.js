const mongoose = require('mongoose');

const CommitSchema = require('./Commit');
const ContributorSchema = require('./Contributor');
const InsightSchema = require('./Insight');

const analysisSchema = new mongoose.Schema(
  {
    repoUrl:    { type: String, required: true, index: true },
    repoName:   { type: String, default: '' },
    analyzedAt: { type: Date,   default: Date.now, index: true },
    summary: {
      totalCommits:      { type: Number, default: 0 },
      totalContributors: { type: Number, default: 0 },
      totalPullRequests: { type: Number, default: 0 },
      totalLinesChanged: { type: Number, default: 0 },
      healthScore:       { type: Number, default: 0 },
      busFactor:         { type: Number, default: 0 }
    },
    result: {
      repository: { type: mongoose.Schema.Types.Mixed },
      summary: { type: mongoose.Schema.Types.Mixed },
      contributors: [ContributorSchema],
      commits: [CommitSchema],
      classificationDistribution: { type: mongoose.Schema.Types.Mixed },
      timeline: {
        daily: [mongoose.Schema.Types.Mixed],
        weekly: [mongoose.Schema.Types.Mixed]
      },
      busFactor: { type: mongoose.Schema.Types.Mixed },
      healthScore: { type: mongoose.Schema.Types.Mixed },
      codeChurn: [mongoose.Schema.Types.Mixed],
      insights: [InsightSchema],
      analyzedAt: { type: Date }
    }
  },
  {
    timestamps: true,           // adds createdAt / updatedAt
    collection: 'analyses'
  }
);

module.exports = mongoose.model('Analysis', analysisSchema);
