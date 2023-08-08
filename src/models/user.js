import { ObjectId } from "mongodb";
import { isEmail } from "validator";

class User {
  constructor(name, contactNo, email, id, location, info, password, vehicles) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.contactNo = contactNo;
    this._id = id ? new ObjectId(id) : null;
    this.location = location;
    this.info = info;
    this.vehicles = vehicles || [];
  }

  validateAndRequired() {
    const errors = [];

    if (!this.name) {
      errors.push("Name is required");
    }

    if (!this.email) {
      errors.push("Email is required");
    } else if (!isEmail(this.email)) {
      errors.push("Invalid email");
    }

    if (!this.password) {
      errors.push("Password is required");
    }

    return errors;
  }
}

export default User;
