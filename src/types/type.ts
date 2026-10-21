import type { FC, PropsWithChildren, SVGProps } from 'react';

import type { RoleEnum } from '@/enums/enum';

/* -------------------------------------------------------------------------- */
/*                                   React                                    */
/* -------------------------------------------------------------------------- */

/** Function component that accepts children. */
export type FCC<P = Record<string, unknown>> = FC<PropsWithChildren<P>>;

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

/** Props every App Router page receives. */
export type PageProps<P extends Record<string, string | string[]> = Record<string, string>> = {
  params: Promise<P>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

/** Props every App Router layout receives. */
export type LayoutProps<P extends Record<string, string | string[]> = Record<string, string>> = {
  children: React.ReactNode;
  params: Promise<P>;
};

/* -------------------------------------------------------------------------- */
/*                                  Utilities                                 */
/* -------------------------------------------------------------------------- */

export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type ValueOf<T> = T[keyof T];
export type Prettify<T> = { [K in keyof T]: T[K] } & {};
export type RequireKeys<T, K extends keyof T> = T & Required<Pick<T, K>>;
export type PartialKeys<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export interface IOption<T = string> {
  label: string;
  value: T;
  disabled?: boolean;
}

export type SortOrder = 'ASC' | 'DESC';

export type RoundType = 'floor' | 'ceil' | 'round';

/* -------------------------------------------------------------------------- */
/*                                  API / HTTP                                */
/* -------------------------------------------------------------------------- */

export interface IMeta {
  code: number;
  message: string;
}

/** Standard backend envelope: `{ meta, data }`. */
export interface IAxiosResponse<T> {
  meta: IMeta;
  data: T;
}

export interface IPagination {
  itemCount: number;
  totalItems: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

export interface IPaginationResponse<T> {
  meta: IPagination;
  data: T;
}

/** Query params accepted by every paginated endpoint. */
export interface IPaginationParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: SortOrder;
}

/** Normalised error every rejected request resolves to (see `src/api/interceptors.ts`). */
export interface IApiError {
  status: number;
  message: string;
  code?: string | number;
  details?: unknown;
}

/* -------------------------------------------------------------------------- */
/*                                   Session                                  */
/* -------------------------------------------------------------------------- */

export interface ISessionUser {
  id: string;
  email?: string;
  name?: string;
  avatar?: string;
  role?: RoleEnum;
}

export interface ITokenPair {
  accessToken: string;
  refreshToken: string;
}
