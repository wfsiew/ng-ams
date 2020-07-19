export class AppConstant {
  public static PAGE_SIZE = 20;
  public static MAX_PAGE_NUMBERS = 10;
  public static NETWORK_TIMEOUT = 60000;

  public static VALIDATE = {
    ALPHABETS: /^[A-Za-z]+$/,
    POSITIVE_INTEGERS: /^[0-9]+$/,
    NUMBER: /^(0|[1-9][0-9]*)$/,
    AMOUNT: /^\d+(\.\d{1,2})?$/,
    CHAR:
      '[^A-Za-z0-9-/#s,@./\u4E00-\u9FCC\u3400-\u4DB5\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\ud840-\ud868][\udc00-\udfff]|\ud869[\udc00-\uded6\udf00-\udfff]|[\ud86a-\ud86c][\udc00-\udfff]|\ud86d[\udc00-\udf34\udf40-\udfff]|\ud86e[\udc00-\udc1d]',
    EMAIL: '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$',
  };
}