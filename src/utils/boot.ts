String.prototype.capitalizeFirstLetter = function (): string {
  return this.charAt(0).toUpperCase().concat(this.slice(1));
};
