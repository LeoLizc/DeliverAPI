export function softDeletePlugin(schema) {
  schema.add({ deleted: { type: Boolean, default: false } });

  schema.pre('find', function () {
    this.where({ deleted: false });
  });

  schema.pre('findOne', function () {
    this.where({ deleted: false });
  });

  schema.methods.delete = function () {
    this.deleted = true;
    return this.save();
  };

  schema.methods.restore = function () {
    this.deleted = false;
    return this.save();
  };

  schema.methods.hardDelete = function () {
    return this.remove();
  };
}