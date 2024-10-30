class UserForm {
  constructor({ ...args }) {
    this.uuid = args?.uuid;
    this.profile = {
      name: args?.name,
      email: args?.email,
      phoneNumber: args?.phoneNumber,
      gender: args?.gender,
      birth: args?.birth,
      joinDate: args?.joinDate,
      userType: args?.userType,
      accountState: args?.accountState,
    };
    this.opt = {
      email_opt: false,
      sms_opt: false,
      push_opt: false,
      night_opt: false,
    };
    // this.address = {};
    this.mar = {
      asd: "as",
    };
  }
}

const a = new UserForm({ name: "hello" });
console.log(a.obj.asd);
