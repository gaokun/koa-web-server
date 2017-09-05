
//constant value

//Operation Start
exports.OPT = {
  RETRIEVE: 1,
  CREATE: 1 << 1,
  UPDATE: 1 << 2,
  DELETE: 1 << 3,
  ADMIN_RETRIEVE: 1 << 4,
  ADMIN_CREATE: 1 << 5,
  ADMIN_UPDATE: 1 << 6,
  ADMIN_DELETE: 1 << 7,
  DESC: {
    1: 'opt_retrieve',
    2: 'opt_create',
    4: 'opt_update',
    8: 'opt_delete',
    16: 'opt_admin_retrieve',
    32: 'opt_admin_create',
    64: 'opt_admin_update',
    128: 'opt_admin_delete',
  }
};
//Operation End

exports.USER_ACTION = {
  LOGIN: 1,
  LOGOUT: 2,
  WRONG_ANSWER: 3,
  CORRECT_ANSWER: 4,
  CONNECT: 5,
  DISCONNECT: 6,
  FINISH_GAME: 7
};

exports.PERSON_TYPE = {
  OWNER: 1,
  MEMBER: 2
};
exports.ROOM_ROLE = {
  NONE: 0,
  TEACHER: 1,
  STUDENT: 2,
  ASSISTANT: 3
};
exports.MSG_TYPE = {
  SYS_GLOBAL: 1,
  SYS_ROOM: 2,
  CHAT: 3,
  CHAT_PRI: 4
};
exports.ERROR_CODE = {
  NO_ROOM: 1,
  NO_USER_INFO: 2,
  NO_ROOM_INFO: 3,
  SAME_NICKNAME: 4,
  WRONG_ACCESS_CODE: 5,
  ALREADY_IN_ROOM: 6,
  HAS_SAME_ROOM: 7,
  SYSTEM_ERROR: 1000,
  MOBILE_ALREADY_TOOK: 1001,
  LOGIN_NAME_ALREADY_TOOK: 1002,
  EMAIL_ALREADY_TOOK: 1003,
  VERIFY_SMS_CODE_FAILED: 1004,
  REQUIRE_MORE_PARAMS: 1005,
  INVALID_PARAMS: 1006,
  NO_USER: 1007,
  TOKEN_ERROR: 1008,
  DB_ERROR: 1009,
  WX_API_ERROR: 1010,
  NO_AUTH: 1011,
  EXHAUSTED: 1012,
  NO_RES: 1013,
  ALREADY_HAD_RES: 1014,
  DESC: {
    1: 'No this room',
    2: 'Require more user information',
    3: 'Require room information',
    4: 'Already has same nickname in this room',
    5: 'Wrong access code',
    6: 'You already in this room',
    7: 'Already has same room',
    1000: '系统错误',
    1001: '手机 已占用',
    1002: '登陆名 已占用',
    1003: '邮箱 已占用',
    1004: '校验短信验证码过程出错',
    1005: '参数不足',
    1006: '无效参数',
    1007: '无此用户',
    1008: 'Token错误',
    1009: 'sql执行出错',
    1010: '微信API错误',
    1011: '无权限执行此操作',
    1012: '已用尽',
    1013: '无此资源',
    1014: '已拥有此资源',
  }
};

exports.QUESTION_TYPE = {
  CHOSEN: 1,
  FILL: 2,
  READ: 3,
  JUDGEMENT: 4
};

exports.ROOM_STATUS = {
  NONE: 1,
  EXAM: 2,
  QUESTION: 3,
  GAME: 4
};

exports.USER_TYPE = {
  ADMIN: 1,
  TEACHER: 2,
  STUDENT: 3,
  PARENT: 4,
  DESC: {
    1: 'Admin',
    2: 'Teacher',
    3: 'Student',
    4: 'Parent'
  }
};

// Fill the vendorkey and sign key given by Agora.io
exports.AGORA = {
  VENDOR_KEY: "a85c79ba446240dea8529d67dd15b3dd",
  SIGN_KEY: "5ae5ea58410f4f559d7ff015325a8969"
};

exports.PRODUCT_STATUS = {
  NONE: 0,
  PUBLIC: 1,
  SHELVED: 2,
  EXPIRED: 3,
  FREEZE: 4,
  DESC: {
    0: 'None',
    1: 'Public',
    2: 'Shelved',
    3: 'Expired',
    4: 'Freeze',
  }
};

exports.PRODUCT_TYPE = {
  NONE: 0,
  LESSON_SERIES: 1,
};

// SUCCESS—支付成功
// REFUND—转入退款
// NOTPAY—未支付
// CLOSED—已关闭
// REVOKED—已撤销（刷卡支付）
// USERPAYING--用户支付中
// PAYERROR--支付失败(其他原因，如银行返回失败)
exports.ORDER_STATUS = {
  NONE: 0,
  NOT_PAY: 1,
  NOTPAY: 1,
  PAID: 2,
  SUCCESS: 2,
  EXPIRED: 3,
  REFUND: 4,
  CLOSED: 5, // admin可能出于某些原因, 主动冻结order
  REVOKED: 6,
  USERPAYING: 7,
  PAYERROR: 8,
  DESC: {
    0: 'None',
    1: '未支付',
    2: '已支付',
    3: '过期',
    4: '转入退款',
    5: '已关闭',
    6: '已撤销(刷卡支付)',
    7: '用户支付中',
    8: '支付失败(其他原因, 如银行返回失败)',
  }
};

exports.TIMEOUT = {
  WX: 4000
};

// Ken 2017-07-19 09:03 对应tprivilege表中的字段
exports.RES = {
  BOOK: 'book',
  REPLAY: 'replay',
  LESSON: 'lesson',
  BOOK_SERIES: 'book_series',
  PRODUCT: 'product',
  TAG: 'tag',
  USER_GROUP: 'user_group',
  COUPON: 'coupon',
};

exports.COUPON_STATUS = {
  NONE: 0,
  NO_OWNER: 1,
  NOT_USE: 2,
  USED: 3,
  EXPIRED: 4,
  DESC: {
    0: 'None',
    1: '未领取',
    2: '未使用',
    3: '已使用',
    4: '已过期',
  }
};

exports.ACCESS_LESSON_ACTION = {
  NONE: 0,
  ENTER: 1,
  LEAVE: 2,
  DESC: {
    0: 'None',
    1: 'Enter',
    2: 'Leave',
  }
};

// homework_question, homework_result
exports.HOMEWORK_STATUS = {
  NONE: 0,
  DRAFT: 1,
  RELEASE: 2,
  REVOKED: 3,
  SUBMIT: 4,
  EVALUATED: 5,
  EXPIRED: 6,
  DESC: {
    0: 'None',
    1: 'Draft',
    2: 'Release',
    3: 'Revoked',
    4: 'Submit',
    5: 'Evaluated',
    6: 'Expired',
  }
};

exports.HOMEWORK_RES_TYPE = {
  NONE: 0,
  TEXT: 1,
  PIC: 2,
  AUDIO: 3,
  VIDEO: 4,
  DESC: {
    0: 'None',
    1: 'Text',
    2: 'Pic',
    3: 'Audio',
    4: 'Video',
  }
};

exports.METHOD = {'GET': 1, 'POST': 2, 'PUT': 3, 'DELETE': 4, 'OPTIONS': 5};