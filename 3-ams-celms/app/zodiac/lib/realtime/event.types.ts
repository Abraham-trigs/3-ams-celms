export type RealtimeEvent =
  | {
      type: "job.created";
      payload: any;
    }
  | {
      type: "job.updated";
      payload: any;
    }
  | {
      type: "stock.updated";
      payload: any;
    }
  | {
      type: "price.updated";
      payload: any;
    };
