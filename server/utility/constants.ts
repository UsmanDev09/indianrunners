export const Constants = {
    // user
    userFetchSuccessfully: 'User fetch successfully',
    userRegisteredSuccessfully: 'User registered successfully',
    userUpdatedSuccessfully: 'User updated successfully',
    userDeletedSuccessfully: 'User deleted successfully',
    userLoggedInSuccessfully: 'User logged in successfully',
    userExists: 'User already exists',
    invalidUserId: 'Invalid user id',
    userNotFound: 'User not found',
    tokenExpiryTimeNotFound: 'App token expiry time not found',

    // challenge
    challengeCreatedSuccessfully: 'Challenge has been created successfully',
    challengeUpdatedSuccessfully: 'Challenge has been updated successfully',
    challengeDeletedSuccessfully: 'Challenge has been deleted successfully',
    challengesFetchedSuccessfully: 'Challenges has been fetched successfully',
    challengeFetchedSuccessfully: 'Challenge has been fetched successfully',
    openChallengesShouldHaveLowerLimit: 'Open Challenges must have lower cut off limit',
    openChallengesWrongOptions: 'Wrong Options have been provided to open challenge',
    fixedChallengesShouldHaveUpperLimitAndFixedLimit: 'Fixed Challenges should have upper limit and a fixed limit',
    fixedChallengesWrongOptions: 'Wrong Options have been provided to fixed challenge', 
    challengesWrongOptions: 'Wrong Options have been provided to challenge',
    singleCategoryShouldBeProvided: 'Only one category should be provided',
    multipleCategoriesShouldBeProvided: 'More than one categories should be provided',
    knockoutTypeShouldBeProvided: 'Knockout type should be provided',
    hourlyKnockoutChallengesMustHaveCutOffHours: 'Hourly Knockout Challenges must have Cut Off Hours', 
    dailyKnockoutChallengesMustHaveCutOffDays: 'Daily Knockout Challenges must have Cut Off Days',
    challengeNotFound: 'Challenge not found',

    // category
    categoryCreatedSuccessfully: 'Category has been created successfully',
    categoryUpdatedSuccessfully: 'Category has been updated successfully',
    categoryDeletedSuccessfully: 'Category has been deleted successfully',
    categoriesFetchedSuccessfully: 'Categories has been fetched successfully',
    categoryNotFound: 'Category not found',

    //badge
    badgeCreatedSuccessfully: 'Badge has been created successfully',
    badgeUpdatedSuccessfully: 'Badge has been updated successfully',
    badgeDeletedSuccessfully: 'Badge has been deleted successfully',
    badgesFetchedSuccessfully: 'Badge has been fetched successfully',

    // products
    productAddedToCategorySuccessfully: 'Product has been added to category successfully',
    productCreatedSuccessfully: 'Product has been created successfully',
    productUpdatedSuccessfully: 'Product has been updated successfully',
    productDeletedSuccessfully: 'Product has been deleted successfully',
    
    // cart
    cartCreatedSuccessfully: 'Cart has been created successfully',
    cartUpdatedSuccessfully: 'Cart has been updated successfully',
    cartFetchedSuccessfully: 'Cart has been fetched successfully',
    cartIsEmpty: 'Your cart is empty',
    // shipping details
    shippingDetailsAddedSuccessfully: 'Shipping details has been added successfully',

    // order summary
    orderDetailsFetchedSuccessfully: 'Order Details have been fetched successfully',
    orderCreatedSuccessfully: 'Order created successfully', 

    // activity 
    activityCreatedSuccessfully: 'Activity created successfully', 
    
    // notification
    notificationCreatedSuccessfully: 'Notification created successfully',
    notificationsFetchedSuccessfully: 'Notifications fetched successfully', 
    notificationUpdatedSuccessfully: 'Notification updated successfully',
    
    // user challenges 
    userChallengesFetchedSuccessfully: 'User Challenegs created successfully',
    userChallengesAreEmpty: 'User Challenges are empty',

    // leaderboard
    leaderboardNotFound: 'Leaderboard not found',
    leaderboardIsEmpty: 'Leaderboard is empty',
    
    invalidId: 'Invalid id',
    notFound: 'Not found',
    recordFound: 'Record found',
    routeNotFound: 'Route not found',
    pleaseAddPassword: 'Please add a password',
    loginToProceed: 'Please login to proceed',
    invalidCredentials: 'Invalid email or password',
    pleaseAddEmptyFields: (emptyFields:string) => `Please add ${emptyFields} field(s)`,
    pleaseAddName: 'Please add a name',
    pleaseAddEmail: 'Please add an email',
    authorizationError: 'You are not authorized',
    forbiddenParameters: (forbiddenParams:string) => `Forbidden parameter(s): ${forbiddenParams}`,
    requiredParameters: (requiredParams:string) => `Missing required parameter(s): ${requiredParams}`,
    notificationEmailSubject: (tournamentName:string, teamName:string) => `Registration for ${tournamentName} - ${teamName}`,
    notificationEmailBody: (tournamentName:string, teamName:string, fromName:string) => `<p>Hello,</p><p>Your team "${teamName}" has been registered for the "${tournamentName}" tournament by "${fromName}"</p><p>Thank you!</p>`,
    unauthorizedAccess: 'You are not authorised to access this resource',
    otpSentSuccessfully: 'Otp has been sent successfully',
    incorrectOtp: 'Otp is incorrect',
    changedPasswordSuccessfully: 'Password has been changed successfully',
    authenticationError: 'Not authenticated -no token',
    // models 
    emailRequired: 'Email is required',
    passwordRequired: 'Password is required',
    codeRequired: 'Code is required',
}

export const ROLES = {
    ADMIN : 'admin',
    USER: 'user'
}