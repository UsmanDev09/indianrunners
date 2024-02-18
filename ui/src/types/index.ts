import { ReactNode } from "react";

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
  
    /**  */
    challengeCategories?: ChallengeCategory[];
  }
  
  export interface Challenge {
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
    userDetails?: UserDetails;
  
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
    name?: string;
  
    /**  */
  
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

    shippingDetail: ShippingDetail;
  }
  
  export interface Category {
    /**  */
    _id: number;
    name?: string;
  
    /**  */
    activity?: EnumCategoryActivity;
  
    /**  */
    distance?: number;
  
    /**  */
    description?: string;
  }
  
  export interface Inventory {
    product: Product;
    name: string;
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

  export interface LandingPage {
    mainSection: {
        image: string
    };
    sections: []
  }

  export enum EnumActivityActivityType {
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
  export type ItemType = 'challenge' | 'product';
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
  