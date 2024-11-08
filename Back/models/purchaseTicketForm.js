// @ts-check
/**
 * Firebase Timestamp object format.
 * @typedef {Object} FirebaseDateObject
 * @property {number} seconds - UTC seconds since epoch (1970-01-01T00:00:00Z).
 * @property {number} nanoseconds - Fractional seconds in nanoseconds.
 */

/**
 * 결제 기록 정보.
 * @typedef {Object} PurchaseRecord
 * @property {?string} transactionId - 거래 식별자.
 * @property {?string} userId - 사용자 고유 식별자.
 * @property {?string} storeId - 결제가 이루어진 상점의 식별자.
 * @property {?string} usageLogId - 관련된 사용 기록의 식별자.
 * @property {?number} amount - 결제 금액.
 * @property {?string} currency - 결제 통화 (예: USD, KRW).
 * @property {?FirebaseDateObject} purchaseDate - 구매 날짜.
 * @property {?string} paymentMethod - 결제 수단 (예: 신용카드, 페이팔).
 * @property {?string} status - 결제 상태 (예: 완료, 취소, 환불).
 * @property {?FirebaseDateObject} refundDate - 환불 날짜 (해당되는 경우).
 */

/**
 * 결제 기록 정보를 관리하는 클래스.
 */
class PurchaseTicket {
  /**
   * @param {Partial<PurchaseRecord>} purchase - 결제 기록 정보.
   */
  constructor(purchase = {}) {
    /**
     * @type {PurchaseRecord}
     */
    this.purchase = {
      transactionId: purchase.transactionId ?? null,
      userId: purchase.userId ?? null,
      storeId: purchase.storeId ?? null,
      usageLogId: purchase.usageLogId ?? null,
      amount: purchase.amount ?? null,
      currency: purchase.currency ?? null,
      purchaseDate: purchase.purchaseDate ?? null,
      paymentMethod: purchase.paymentMethod ?? null,
      status: purchase.status ?? null,
      refundDate: purchase.refundDate ?? null,
    };
  }
}

module.exports = PurchaseTicket;
