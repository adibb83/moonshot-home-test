// global variables
// import { environment } from '../environments/environment';

// for the following we should have used if(environment.production) but the condition also relate to
// other stages in production where we still want to use the 'dev' version of APIs

let environmentSubdomain: string;
switch (location.hostname) {
    case 'developers.over.ai':
        environmentSubdomain = '';
        break;
    case 'developers.stg.over.ai':
        environmentSubdomain = 'stg.';
        break;
    default:
        environmentSubdomain = 'qa.';
        break;
}
export const apiUrl = `//hermes.${environmentSubdomain}over.ai/`;
export const testApiUrl = `//api.${environmentSubdomain}over.ai/api/smartreceptionisttest`;
// export const restrictedUrls: string[] = ['/account/edit', '/account/login', '/agent']; // remember to update on new pages
// regex of english + non english chars
export const allLngChars = /\w|[^\u0000-\u007F]+/g;
// tslint:disable-next-line:max-line-length
export const urlCheck = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/g;
// tslint:disable-next-line:max-line-length
export const emailCheck = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// check for: upper case, lower case, numbers, non-alpha numeric
export const passCheck = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{0,}$/;

// Google keys
export const gApiClientId = '902629076657-n09useaqh2l81ebi09fq6oqp4mgbkvcu.apps.googleusercontent.com';
export const gApiKey = 'AIzaSyDEJrOTOWft6GTYPQzXTvnjZQUseVdW6RE';


