export interface SuccessResponse {
    success: true;
    message: string;
    data: any;
    meta?: any; 
  }
  

  export interface ErrorResponse {
    success: false;
    message: string;
    error: {
      code: string;
      details: Array<{
        field: string;
        message: string;
      }>;
    };
  }
  