import type { UploadResult } from "../types/cloudnaryTypes";

export const normalizeCloudinaryUrls = (
  uploadResults: UploadResult[],
  isMultiple: boolean = false
): string | string[] => {
  const uploadedUrls = uploadResults
    .filter((res) => res.success && res.data?.secure_url)
    .map((res) => res.data.secure_url);

  return isMultiple ? uploadedUrls : uploadedUrls[0] || '';
};
