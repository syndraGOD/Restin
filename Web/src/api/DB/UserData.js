// @ts-check
/**
 * Firebase Timestamp object format.
 * @typedef {Object} FirebaseDateObject
 * @property {number} seconds - UTC seconds since epoch (1970-01-01T00:00:00Z).
 * @property {number} nanoseconds - Fractional seconds in nanoseconds.
 */

/**
 * 사용자 프로필 정보.
 * @typedef {Object} UserProfile
 * @property {?string} userId - 사용자 고유 식별자.
 * @property {?number} gender - 성별 (0: 남성, 1: 여성, 2: 기타).
 * @property {?string} name - 사용자 이름.
 * @property {?string} email - 사용자 이메일.
 * @property {?string} phoneNumber - 사용자 전화번호.
 * @property {?FirebaseDateObject} birth - 생년월일.
 * @property {?FirebaseDateObject} joinDate - 가입일.
 * @property {?("user" | "store" | "admin")} userType - 사용자 유형 (user, store, admin).
 * @property {?string} accountState - 계정 상태.
 */

/**
 * 사용자 옵션 설정.
 * @typedef {Object} UserOptions
 * @property {?string} userId - 사용자 고유 식별자.
 * @property {?boolean} email_opt - 이메일 알림 수신 동의 여부.
 * @property {?boolean} sms_opt - SMS 알림 수신 동의 여부.
 * @property {?boolean} push_opt - 푸시 알림 수신 동의 여부.
 * @property {?boolean} night_opt - 야간 알림 수신 동의 여부.
 */

/**
 * 사용자 이용 시간 정보.
 * @typedef {Object} UserUsage
 * @property {?string} userId - 사용자 고유 식별자.
 * @property {?string} usageLogId - 사용 기록 식별자.
 * @property {?FirebaseDateObject} startTime - 시작 시간.
 * @property {?FirebaseDateObject} endTime - 종료 시간.
 * @property {?number} totalUsageDuration - 총 사용 시간 (초).
 */

/**
 * 사용자 주소 정보.
 * @typedef {Object} UserAddress
 * @property {?string} userId - 사용자 고유 식별자.
 * @property {?string} addressId - 주소 식별자.
 * @property {?string} addressType - 주소 유형.
 * @property {?string} addressLine1 - 주소 첫 번째 줄.
 * @property {?string} city - 도시.
 * @property {?string} state - 주/도.
 * @property {?string} postal_code - 우편 번호.
 * @property {?string} country - 국가.
 */

/**
 * 사용자 보안 정보.
 * @typedef {Object} UserSecurity
 * @property {?string} userId - 사용자 고유 식별자.
 * @property {?FirebaseDateObject} lastLogin - 마지막 로그인 시간.
 * @property {?number} login_attempts - 로그인 시도 횟수.
 * @property {?string} auth_token - 인증 토큰.
 */

/**
 * 사용자 포인트 정보.
 * @typedef {Object} UserPoints
 * @property {?string} userId - 사용자 고유 식별자.
 * @property {?number} reward_points - 보상 포인트.
 * @property {?string} vip_tier - VIP 등급.
 * @property {?FirebaseDateObject} points_expiration - 포인트 만료 날짜.
 */

/**
 * 사용자 선호 정보.
 * @typedef {Object} UserPreferences
 * @property {?string} userId - 사용자 고유 식별자.
 * @property {?Array<string>} recently_viewed - 최근 본 항목 목록.
 * @property {?Array<string>} wishlist - 위시리스트.
 * @property {?Array<string>} preferred_category - 선호하는 카테고리.
 * @property {?Array<string>} purchase_history - 구매 이력.
 */

/**
 * 사용자 정보를 관리하는 클래스.
 */
export class UserForm {
  /**
   * @param {Object} args
   * @param {string} args.userId - 사용자 고유 식별자.
   * @param {UserProfile} [args.profile] - 사용자 프로필 정보.
   * @param {UserOptions} [args.opt] - 사용자 옵션 설정.
   * @param {UserUsage} [args.usage] - 사용자 이용 시간 정보.
   * @param {UserAddress} [args.address] - 사용자 주소 정보.
   * @param {UserSecurity} [args.security] - 사용자 보안 정보.
   * @param {UserPoints} [args.points] - 사용자 포인트 정보.
   * @param {UserPreferences} [args.preference] - 사용자 선호 정보.
   */
  constructor({
    userId,
    profile = {},
    opt = {},
    usage = {},
    address = {},
    security = {},
    points = {},
    preference = {},
  }) {
    this.userId = userId ?? null;

    this.profile = {
      userId: this.userId,
      gender: profile.gender ?? null,
      name: profile.name ?? null,
      email: profile.email ?? null,
      phoneNumber: profile.phoneNumber ?? null,
      birth: profile.birth ?? null,
      joinDate: profile.joinDate ?? null,
      userType: profile.userType ?? null,
      accountState: profile.accountState ?? null,
    };

    this.opt = {
      userId: this.userId,
      email_opt: opt.email_opt ?? null,
      sms_opt: opt.sms_opt ?? null,
      push_opt: opt.push_opt ?? null,
      night_opt: opt.night_opt ?? null,
    };

    this.usage = {
      userId: this.userId,
      usageLogId: usage.usageLogId ?? null,
      startTime: usage.startTime ?? null,
      endTime: usage.endTime ?? null,
      totalUsageDuration: usage.totalUsageDuration ?? null,
    };

    this.address = {
      userId: this.userId,
      addressId: address.addressId ?? null,
      addressType: address.addressType ?? null,
      addressLine1: address.addressLine1 ?? null,
      city: address.city ?? null,
      state: address.state ?? null,
      postal_code: address.postal_code ?? null,
      country: address.country ?? null,
    };

    this.security = {
      userId: this.userId,
      lastLogin: security.lastLogin ?? null,
      login_attempts: security.login_attempts ?? null,
      auth_token: security.auth_token ?? null,
    };

    this.points = {
      userId: this.userId,
      reward_points: points.reward_points ?? null,
      vip_tier: points.vip_tier ?? null,
      points_expiration: points.points_expiration ?? null,
    };

    this.preference = {
      userId: this.userId,
      recently_viewed: preference.recently_viewed ?? null,
      wishlist: preference.wishlist ?? null,
      preferred_category: preference.preferred_category ?? null,
      purchase_history: preference.purchase_history ?? null,
    };
  }
}

export class UsageData {
  constructor({ ...args }) {
    this.usage = {
      userId: args?.userId,
      usageId: args?.userId,
      // isUsageActive : args?.isUsageActive,
      startTime: args?.startTime,
      endTime: args?.endTime,
      totalUsageDuration: args?.totalUsageDuration,
    };
  }
}

const a = new UserForm({ userId: "hi", profile: { name: "hello" } });

console.log(a);
