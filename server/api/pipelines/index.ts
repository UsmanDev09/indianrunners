// const updateLeaderboardPipeline = [{$match: { _id: new mongoose.Types.ObjectId(leaderboard._id)}},  {$unwind: '$userDetails'}, { $match: { 'userDetails.user': new mongoose.Types.ObjectId(user._id) }}, {$project : {'userDetails': {$mergeObjects: [ "$userDetails", { distance: { $add: ["$userDetails.distance", activity.distance]} }]} }}]

// const updatedLeaderboardRankingPipeline: any = [
//     {
//         $match: {
//             _id: new mongoose.Types.ObjectId(leaderboard._id), // Match the specific leaderboard by ID
//         },
//     },
//     {
//         $unwind: '$userDetails', // Deconstruct the userDetails array
//     },
//     {
//         $sort: {
//             'userDetails.distance': -1, // Sort by distance in ascending order
//             'userDetails.pace': 1,   
//             'userDetails.qualifiedDays': 1,
//             'userDetails.qualifiedHours': 1, 
//         },
//     },
//     {
//         $group: { 
//             _id: '$_id', 
//             userDetails: { $push: '$userDetails' }
//         }
//     }, 
//     {
//         $unwind: {
//             path:'$userDetails', 
//             includeArrayIndex: "userDetails.rank" 
//         }
//     }, 
//     {
//         $addFields: {
//             'userDetails.rank': { 
//                 $toInt: '$userDetails.rank'
//             }
//         }
//     },
//     {
//         $group: {
//             _id: '$_id', // Group by leaderboard document // db.leaderboards.aggregate([{$match: { _id: ObjectId('6512ef1156861123d528d9d9')}}, { $lookup: {from: 'users', localField: 'userDetails.user', foreignField: '_id', as: 'users_data' }}, {$unwind: '$userDetails'}, {$sort: {'userDetails.distance': -1, 'userDetails.pace': 1, 'userDetails.qualifiedHours': -1 }}, {$group: { _id: '$_id', userDetails: { $push: '$userDetails' }}}, {$unwind: {path:'$userDetails', includeArrayIndex: "userDetails.rank" }}, {$addFields: {'userDetails.rank': {$toInt: '$userDetails.rank'}} }])
//             userDetails: { $push: '$userDetails' }, // Reconstruct the userDetails array
//         },
//     },

// ];
