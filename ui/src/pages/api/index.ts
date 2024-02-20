/** Generate by swagger-axios-codegen */
// @ts-nocheck
/* eslint-disable */

/** Generate by swagger-axios-codegen */
/* eslint-disable */
// @ts-nocheck
import axiosStatic, { AxiosInstance, AxiosRequestConfig } from 'axios';

export interface IRequestOptions extends AxiosRequestConfig {
  /** only in axios interceptor config*/
  loading?: boolean;
  showError?: boolean;
}

export interface IRequestConfig {
  method?: any;
  headers?: any;
  url?: any;
  data?: any;
  params?: any;
}

// Add options interface
export interface ServiceOptions {
  axios?: AxiosInstance;
  /** only in axios interceptor config*/
  loading: boolean;
  showError: boolean;
}

// Add default options
export const serviceOptions: ServiceOptions = {};

export function axios(configs: IRequestConfig, resolve: (p: any) => void, reject: (p: any) => void, token: any): Promise<any> {

  const axiosInstance = axiosStatic.create({
    baseURL: process.env.SERVER_DOMAIN, // Set your API base URL here
    // You can add more configurations like headers, timeout, etc., if needed
  });

  axiosInstance.interceptors.request.use(function (config) {
    config.headers.Authorization = `Bearer ${token}`
    return config
  })

  serviceOptions.axios = axiosInstance;
  if (serviceOptions.axios) {
    return serviceOptions.axios
      .request(configs)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        console.error('error axios');
        
        // Log specific error details for debugging
        console.error('Error Message:', err.message); // Log the error message
        if (err.response) {
          console.error('Response Data:', err.response.data); // Log response data if available
          console.error('Response Status:', err.response.status); // Log response status if available
        }
        console.error('Stack Trace:', err.stack); // Log the stack trace

        reject(err);
      });
  } else {
    throw new Error('please inject yourself instance like axios  ');
  }
}

export function getConfigs(method: string, contentType: string, url: string, options: any): IRequestConfig {
  const configs: IRequestConfig = {
    loading: serviceOptions.loading,
    showError: serviceOptions.showError,
    ...options,
    method,
    url
  };
  configs.headers = {
    ...options.headers,
    'Content-Type': contentType
  };
  return configs;
}


export const basePath = '';

export interface IList<T> extends Array<T> {}
export interface List<T> extends Array<T> {}
export interface IDictionary<TValue> {
  [key: string]: TValue;
}
export interface Dictionary<TValue> extends IDictionary<TValue> {}

export interface IListResult<T> {
  items?: T[];
}

export class ListResultDto<T> implements IListResult<T> {
  items?: T[];
}

export interface IPagedResult<T> extends IListResult<T> {
  totalCount?: number;
  items?: T[];
}

export class PagedResultDto<T = any> implements IPagedResult<T> {
  totalCount?: number;
  items?: T[];
}

// customer definition
// empty

export class ApiService {
  /**
   *
   */
  static authorizeToGetActivityFromStrava(options: IRequestOptions = {}): Promise<AuthorizeStravaResponse> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/activity';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static getActivities( options: IRequestOptions = {}, token:any): Promise<ActivityApiResponse> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/activity';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject, token);
    });
  }
  /**
   *
   */
  static createBadges(options: IRequestOptions = {}): Promise<CreateBadgeApiResponse> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/badge';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static getBadges(options: IRequestOptions = {}): Promise<BadgeApiResponse> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/badge';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static removeChallengeToCart(options: IRequestOptions = {}): Promise<CartApiResponse> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/cart';

      const configs: IRequestConfig = getConfigs('put', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static addChallengeToCart(options: IRequestOptions = {}): Promise<CartApiResponse> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/cart';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static getCart(options: IRequestOptions = {}): Promise<CartApiResponse> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/cart';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static createChallenge(
    params: {
      /** requestBody */
      body?: Challenge;
    } = {} as any,
    token: any,
    options: IRequestOptions = {}
  ): Promise<ChallengeApiResponse> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/challenge';
  
      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);
  
      let data = params.body;
  
      configs.data = data;
  
      axios(configs, resolve, reject, token);
    });
  }
  /**
   *
   */
  static getAllChallenges(options: IRequestOptions = {}, token: any): Promise<ChallengeApiResponse> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/challenge';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject, token);
    });
  }
  /**
   *
   */
  static createChallengeCategory(
    params: {
      /** requestBody */
      body?: ChallengeCategory;
    } = {} as any,
    token: any,
    options: IRequestOptions = {}
  ): Promise<ChallengeCategoryApiResponse> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/challengeCategory';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject, token);
    });
  }
  /**
   *
   */
  static getAllChallengeCategory(options: IRequestOptions = {}, token: any): Promise<ChallengeCategoryApiResponse> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/challengeCategory';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject, token);
    });
  }
  /**
   *
   */
  static getLeaderboards(options: IRequestOptions = {}, token: any): Promise<LeaderboardApiResponse> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/leaderboard';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject, token);
    });
  }
  /**
   *
   */
  static getAllNotifications(options: IRequestOptions = {}): Promise<NotificationApiResponse> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/notification';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static createProduct(
    params: {
      /** requestBody */
      body?: any;
    } = {} as any,
    token: any,
    options: IRequestOptions = {}
  ): Promise<ProductApiResponse> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/product';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject, token);
    });
  }
  /**
   *
   */
  static getAllProducts(options: IRequestOptions = {}, token: any): Promise<ProductApiResponse> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/product';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject, token);
    });
  }
  /**
   *
   */
  static createShippingDetail(options: IRequestOptions = {}): Promise<ShippingDetailApiResponse> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/shippingDetail';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
}

export class ChallengeService {
  /**
   *
   */
  static getChallenge(options: IRequestOptions = {}): Promise<ChallengeApiResponse> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/challenge/:id';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
}

export class ProductService {
  /**
   *
   */
  static updateProduct(
    params: {
      /**  */
      id: string;
      /** requestBody */
      body?: Product;
    } = {} as any,
    token: any,
    options: IRequestOptions = {}
  ): Promise<ProductApiResponse> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/product/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('put', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject, token);
    });
  }
  /**
   *
   */
  static deleteProduct(
    params: {
      /**  */
      id: string;
    } = {} as any,
    token: any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/product/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      axios(configs, resolve, reject, token);
    });
  }
}

export class UserService {
  /**
   *
   */
  static login(options: IRequestOptions = {}): Promise<UserApiResponse> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/user/login';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static register(options: IRequestOptions = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/user/register';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static getOtp(
    params: {
      /**  */
      email: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/user/otp';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { email: params['email'] };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static getProfile(options: IRequestOptions = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/user/profile';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static updatePassword(options: IRequestOptions = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/user/password';

      const configs: IRequestConfig = getConfigs('put', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
}

export interface AuthorizeStravaResponse {
  /**  */
  success?: boolean;

  /**  */
  message?: string;
}

export interface ActivityApiResponse {
  /**  */
  success?: boolean;

  /**  */
  message?: string;

  /**  */
  data?: Activity[];
}

export interface Activity {
  _id: any;
  /**  */
  activityId?: number;

  /**  */
  userId?: string;

  /**  */
  activityType?: EnumActivityActivityType;

  /**  */
  startDate?: Date;

  /**  */
  elapsedTime?: number;

  /**  */
  movingTime?: number;

  /**  */
  distanceCovered?: number;

  /**  */
  averageSpeed?: number;

  /**  */
  maximumSpeed?: number;

  /**  */
  totalAssent?: number;

  status: string;
}

export interface CreateBadgeApiResponse {
  /**  */
  success?: boolean;

  /**  */
  message?: string;

  /**  */
  data?: Badge;
}

export interface Badge {
  /**  */
  name?: string;

  /**  */
  description?: string;

  /**  */
  criteria?: BadgeCriteria;
}

export interface BadgeCriteria {
  /**  */
  activities?: EnumBadgeCriteriaActivities;

  /**  */
  distance?: number;

  /**  */
  consecutiveDays?: number;

  /**  */
  specificDays?: Date;

  /**  */
  numberOfActivities?: number;

  /**  */
  category?: EnumBadgeCriteriaCategory;
}

export interface BadgeApiResponse {
  /**  */
  success?: boolean;

  /**  */
  message?: string;

  /**  */
  data?: Badge[];
}

export interface CartApiResponse {
  /**  */
  success?: boolean;

  /**  */
  message?: string;

  /**  */
  data?: Cart[];
}

export interface Cart {
  _id: number;

  /**  */
  itemType?: ItemType;

  /**  */
  itemDetails?: ItemDetails[];
}

export interface ItemDetails {
  /**  */
  challenge?: Challenge;
  product?: Product;
  productQuantity?: number;
  productQuantity?: number;

  /**  */
  challengeCategories?: ChallengeCategory[];
}

export interface Challenge {
  designState?: JSX.Element;
  /**  */
  name?: string;

  /**  */
  type?: EnumChallengeType;

  /**  */
  activity?: EnumChallengeActivity;

  /**  */
  knockout?: boolean;

  /**  */
  knockoutType?: EnumChallengeKnockoutType;

  /**  */
  lowerLimit?: number;

  /**  */
  upperLimit?: number;

  /**  */
  fixedLimit?: number;

  /**  */
  cutOffDays?: number;

  /**  */
  cutOffHours?: number;

  /**  */
  image?: string;

  /**  */
  startDate?: Date;

  /**  */
  endDate?: Date;

  /**  */
  sport?: EnumChallengeSport;

  /**  */
  tags?: string;

  /**  */
  bibNumber?: number;

  /**  */
  featured?: boolean;

  /**  */
  verified?: boolean;

  /**  */
  organizationName?: string;

  /**  */
  price?: number;

  /**  */
  categories?: ChallengeCategory[];

  /**  */
  _id?: number;
}

export interface ChallengeCategory {
  /**  */
  image?: string; 
  name?: string;

  /**  */
  activity?: EnumChallengeCategoryActivity;

  /**  */
  distance?: number;

  /**  */
  description?: string;

  /**  */
  _id?: number;
}

export interface ChallengeApiResponse {
  /**  */
  success?: boolean;

  /**  */
  message?: string;

  /**  */
  data?: Challenge;
}

export interface ChallengeCategoryApiResponse {
  /**  */
  success?: boolean;

  /**  */
  message?: string;

  /**  */
  data?: ChallengeCategory;
}

export interface LeaderboardApiResponse {
  /**  */
  success?: boolean;

  /**  */
  message?: string;

  /**  */
  data?: Leaderboard[];
}

export interface Leaderboard {
  /**  */
  _id?: number;

  /**  */
  userDetails?: UserDetails[];

  /**  */
  challenge?: Challenge;

  /**  */
  category?: Category;
}

export interface UserDetails {
  /**  */
  user?: User;

  /**  */
  rank?: number;

  /**  */
  distance?: number;

  /**  */
  pace?: Date;

  /**  */
  qualifiedDays?: number;

  /**  */
  qualifiedHours?: number;

  /**  */
  IRPassport?: number;
}

export interface User {
  /**  */
  email?: string;

  /**  */
  password?: string;

  /**  */
  firstName?: string;

  /**  */
  lastName?: string;

  /**  */
  userName?: string;

  /**  */
  dob?: Date;

  /**  */
  gender?: string;

  /**  */
  weight?: number;

  /**  */
  height?: number;

  /**  */
  contact?: number;

  /**  */
  country?: string;

  /**  */
  state?: string;

  /**  */
  city?: string;

  /**  */
  role?: string;

  /**  */
  profileCompleted?: number;

  /**  */
  profilePicture?: string;

  /**  */
  club?: string;

  /**  */
  appsConnected?: string;
}

export interface Category {
  /**  */
  name?: string;

  /**  */
  activity?: EnumCategoryActivity;

  /**  */
  distance?: number;

  /**  */
  description?: string;
}

export interface Inventory {
  product: ReactNode;
  details:{
  /**  */
  size: string;

  /**  */
  quantity: number;

  /**  */
  color: string;
  }

  _id?:string

  isDeleted: Boolean
}

export interface NotificationApiResponse {
  /**  */
  success?: boolean;

  /**  */
  message?: string;

  /**  */
  data?: Notification[];
}

export interface Notification {
  /**  */
  type?: EnumNotificationType;

  /**  */
  message?: string;

  /**  */
  read?: boolean;
}

export interface ProductApiResponse {
  /**  */
  success?: boolean;

  /**  */
  message?: string;

  /**  */
  data?: Product;
}

export interface Product {
  product: any;
  /**  */
  _id?: number;

  /**  */
  name?: string;

  /**  */
  price?: number;

  /**  */
  description?: string;

  /**  */
  image?: string;
  rewardPoints?: number;
}

export interface ShippingDetailApiResponse {
  /**  */
  success?: boolean;

  /**  */
  message?: string;

  /**  */
  data?: ShippingDetail[];
}

export interface ShippingDetail {
  /**  */
  address?: string;

  /**  */
  city?: string;

  /**  */
  state?: string;
}

export interface UserApiResponse {
  /**  */
  success?: boolean;

  /**  */
  message?: string;

  /**  */
  data?: User[];
}
export enum EnumActivityActivityType {
  'Walk' = 'Walk',
  'Run' = 'Run',
  'VirtualRun' = 'VirtualRun',
  'TrailRun' = 'TrailRun',
  'Treadmil' = 'Treadmil',
  'Walk' = 'Walk',
  'Hike' = 'Hike',
  'Ride' = 'Ride',
  'MountainBikeRide' = 'MountainBikeRide',
  'GravelBikeRide' = 'GravelBikeRide',
  'VeloMobile' = 'VeloMobile',
  'VirtialRide' = 'VirtialRide',
  'HandCycle' = 'HandCycle',
  'Swim' = 'Swim',
  'CrossFit' = 'CrossFit',
  'Elliptical' = 'Elliptical',
  'StairStepper' = 'StairStepper',
  'WeightTraining' = 'WeightTraining',
  'Workout' = 'Workout',
  'Hiit' = 'Hiit',
  'Pilates' = 'Pilates',
  'Yoga' = 'Yoga'
}
export enum EnumBadgeCriteriaActivities {
  'Walk' = 'Walk',
  'Run' = 'Run',
  'VirtualRun' = 'VirtualRun',
  'TrailRun' = 'TrailRun',
  'Treadmil' = 'Treadmil',
  'Walk' = 'Walk',
  'Hike' = 'Hike',
  'Ride' = 'Ride',
  'MountainBikeRide' = 'MountainBikeRide',
  'GravelBikeRide' = 'GravelBikeRide',
  'VeloMobile' = 'VeloMobile',
  'VirtialRide' = 'VirtialRide',
  'HandCycle' = 'HandCycle',
  'Swim' = 'Swim',
  'CrossFit' = 'CrossFit',
  'Elliptical' = 'Elliptical',
  'StairStepper' = 'StairStepper',
  'WeightTraining' = 'WeightTraining',
  'Workout' = 'Workout',
  'Hiit' = 'Hiit',
  'Pilates' = 'Pilates',
  'Yoga' = 'Yoga'
}
export enum EnumBadgeCriteriaCategory {
  'Single Activity' = 'Single Activity',
  'Special Achievement' = 'Special Achievement',
  'Challenge' = 'Challenge',
  'Total Distance' = 'Total Distance',
  'Multiple Activities' = 'Multiple Activities'
}
export type ItemType = challenge | product;
export enum EnumChallengeType {
  'open' = 'open',
  'fixed' = 'fixed'
}
export enum EnumChallengeActivity {
  'single' = 'single',
  'multiple' = 'multiple'
}
export enum EnumChallengeKnockoutType {
  'daily' = 'daily',
  'hourly' = 'hourly'
}
export enum EnumChallengeSport {
  'Walk' = 'Walk',
  'Run' = 'Run',
  'VirtualRun' = 'VirtualRun',
  'TrailRun' = 'TrailRun',
  'Treadmil' = 'Treadmil',
  'Walk' = 'Walk',
  'Hike' = 'Hike',
  'Ride' = 'Ride',
  'MountainBikeRide' = 'MountainBikeRide',
  'GravelBikeRide' = 'GravelBikeRide',
  'VeloMobile' = 'VeloMobile',
  'VirtialRide' = 'VirtialRide',
  'HandCycle' = 'HandCycle',
  'Swim' = 'Swim',
  'CrossFit' = 'CrossFit',
  'Elliptical' = 'Elliptical',
  'StairStepper' = 'StairStepper',
  'WeightTraining' = 'WeightTraining',
  'Workout' = 'Workout',
  'Hiit' = 'Hiit',
  'Pilates' = 'Pilates',
  'Yoga' = 'Yoga'
}
export enum EnumChallengeCategoryActivity {
  'Walk' = 'Walk',
  'Run' = 'Run',
  'VirtualRun' = 'VirtualRun',
  'TrailRun' = 'TrailRun',
  'Treadmil' = 'Treadmil',
  'Walk' = 'Walk',
  'Hike' = 'Hike',
  'Ride' = 'Ride',
  'MountainBikeRide' = 'MountainBikeRide',
  'GravelBikeRide' = 'GravelBikeRide',
  'VeloMobile' = 'VeloMobile',
  'VirtialRide' = 'VirtialRide',
  'HandCycle' = 'HandCycle',
  'Swim' = 'Swim',
  'CrossFit' = 'CrossFit',
  'Elliptical' = 'Elliptical',
  'StairStepper' = 'StairStepper',
  'WeightTraining' = 'WeightTraining',
  'Workout' = 'Workout',
  'Hiit' = 'Hiit',
  'Pilates' = 'Pilates',
  'Yoga' = 'Yoga'
}
export enum EnumCategoryActivity {
  'Walk' = 'Walk',
  'Run' = 'Run',
  'VirtualRun' = 'VirtualRun',
  'TrailRun' = 'TrailRun',
  'Treadmil' = 'Treadmil',
  'Walk' = 'Walk',
  'Hike' = 'Hike',
  'Ride' = 'Ride',
  'MountainBikeRide' = 'MountainBikeRide',
  'GravelBikeRide' = 'GravelBikeRide',
  'VeloMobile' = 'VeloMobile',
  'VirtialRide' = 'VirtialRide',
  'HandCycle' = 'HandCycle',
  'Swim' = 'Swim',
  'CrossFit' = 'CrossFit',
  'Elliptical' = 'Elliptical',
  'StairStepper' = 'StairStepper',
  'WeightTraining' = 'WeightTraining',
  'Workout' = 'Workout',
  'Hiit' = 'Hiit',
  'Pilates' = 'Pilates',
  'Yoga' = 'Yoga'
}
export enum EnumNotificationType {
  'badges' = 'badges',
  'challenge' = 'challenge',
  'user' = 'user'
}
