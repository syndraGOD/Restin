class UserForm {
  constructor({ ...args }) {
  // @ts-check
  
  /**@type {number} */
    this.uuid = args?.uuid;
    /**@type {{uuid: number, name: string, email:string, phoneNumber:string, gender:number, birth:}} */
    this.profile = {
      uuid: this.uuid,
      name: args?.name,
      email: args?.email,
      phoneNumber: args?.phoneNumber,
      gender: args?.gender, // man-0, woman-1, not LGBTQ
      birth: args?.birth,
      joinDate: args?.joinDate,
      userType: args?.userType, //user, store, admin
      accountState: args?.accountState,
    };
    this.opt = {
      uuid: this.uuid,
      email_opt: args?.email_opt,
      sms_opt: args?.sms_opt,
      push_opt: args?.push_opt,
      night_opt: args?.night_opt,
    };
    // this.address = {};
    this.usage = {
      uuid: this.uuid,
      usageId: ,
      startTime: '',
      endTime: args?.endTime,
      totalUsageDuration: args?.totalUsageDuration,
    };
  }
}

class UsageData {
  constructor({ ...args }) {
    this.usage = {
      uuid: args?.uuid,
      usageId: args?.uuid,
      // isUsageActive : args?.isUsageActive,
      startTime: args?.startTime,
      endTime: args?.endTime,
      totalUsageDuration: args?.totalUsageDuration,
    };
  }
}

const a = new UserForm({ name: "hello" });
console.log(a.obj.asd);
