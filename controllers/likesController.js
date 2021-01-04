/* eslint-disable prettier/prettier */
const Likes = require('../models/likesModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

exports.getCountLikes = catchAsync(async (req, res, next) => {
    const likesCount = await Likes.aggregate([
        
      {
       $group:{
       _id:'$tour',
       nCount : {$sum:1},
      
     }
    },
    {
        $match:{ tour:'5c88fa8cf4afda39709c2951'}  
    }
    
    ]);
    
console.log(likesCount);
//console.log(likesCount[0].nCount);
res.status(200).json({
    status: 'success',
    data: {
     likesCount
    }
  });
  
 
});

exports.getAllLikes = factory.getAll(Likes);
exports.getLike = factory.getOne(Likes);
exports.createLike = factory.createOne(Likes);
exports.updateLike = factory.updateOne(Likes);
exports.deleteLike = factory.deleteOne(Likes);
