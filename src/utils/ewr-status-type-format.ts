import { EwrStatus } from "@enums/ewr-status-types";

export const formatEwrStatus = (status?: string | null) => {
    if (!status) return ""

    switch (status) {
        case EwrStatus.Cancelled:
            return "Cancelled"
            break;
        case EwrStatus.Applied:
            return "Applied"
            break;
        case EwrStatus.Pending:
            return "Pending"
            break;
        case EwrStatus.Rejected:
            return "Rejected"
            break;
        default:
            return ""
            break;
    }
}