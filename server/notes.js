
TaskSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

TaskSchema.set('toJSON', {
    virtuals: true
});


// instead of creating separate interfaces for every model. we can create virtuals and access id whenever we convert it to json
// by doin toJSON or lean()