export class FeedHeader {
  sellerId: string
  constructor(sellerId: string) {
    this.sellerId = sellerId
  }

  main() {
    return {
      sellerId: this.sellerId,
      version: '2.0',
      issueLocale: 'en_US',
    }
  }
}
