export type UserRole = 'admin' | 'staff' | 'member';

export interface Profile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  role: UserRole;
  updated_at: string;
}

export type TransactionType = 'SAVINGS' | 'LOAN_REPAYMENT';
export type TransactionStatus = 'PENDING' | 'COMPLETED' | 'FAILED';

export interface Transaction {
  id: string;
  member_id: string;
  type: TransactionType;
  amount: number;
  mpesa_receipt?: string;
  status: TransactionStatus;
  created_at: string;
}

export type SavingType = 'DEPOSIT' | 'WITHDRAWAL';

export interface Saving {
  id: string;
  member_id: string;
  amount: number;
  transaction_type: SavingType;
  status: TransactionStatus;
  created_at: string;
}

export type LoanStatus = 'PENDING' | 'APPROVED' | 'DISBURSED' | 'REPAID' | 'REJECTED';

export interface Loan {
  id: string;
  member_id: string;
  amount: number;
  interest_rate: number;
  duration_months: number;
  purpose: string | null;
  status: LoanStatus;
  created_at: string;
}

export type GuarantorStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface Guarantor {
  id: string;
  loan_id: string;
  guarantor_id: string;
  status: GuarantorStatus;
  created_at: string;
}

