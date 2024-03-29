import Config from '../config';
import Interceptor from '../Interceptors';
import axios from "axios";
const config = new Config();

export default {
    /**
     * @param {Number} pageNumber
     * Get All Posts 
    */

    getAllPost: (pageNumber) => {
        return axios.get(config.getBaseUrl() + "post/post" + "?offset=" + pageNumber)
            .then((Response) => Response)
            .catch({ status: 500, message: 'Internal Serevr Error' });
    },

    /**
     * @param {object} payload
     * Edit Post
     */
    editPost: (payload) => {
        console.log("payload in edite post===============>", payload)
        return axios.put(config.getBaseUrl() + "post/post", payload).
            then(response => {
                return response
            })
            .catch({ status: 500, message: 'Internal Serevr Error' })
    },

    /**
     * @param {object} payload
     * Search HashTag
     */
    SearchHashTag: (payload) => {
        return axios.post(config.getBaseUrl() + "post/search", payload).
            then(response => {
                return response
            })
            .catch({ status: 500, message: 'Internal Serevr Error' })
    },

    /**
     * @param {object} payload
     * Like Post
     */
    likePost: (payload) => {
        return axios.post(config.getBaseUrl() + "post/like", payload).
            then(response => {
                return response
            })
            .catch({ status: 500, message: 'Internal Serevr Error' })
    },

    /**
     * @param {object} payload
     * Add Comment
     */
    addComment: (payload) => {
        return axios.post(config.getBaseUrl() + "comment/comment", payload).
            then(response => {
                return response
            })
            .catch({ status: 500, message: 'Internal Serevr Error' })
    },

    /**
     * @param {String} Id
     * Get Shared Posts
     */
    getsharedPosts: (Id) => {
        return axios.get(config.getBaseUrl() + "message/get-shared-post-by-id/" + Id).
            then(response => {
                return response
            })
            .catch({ status: 500, message: 'Internal Serevr Error' })
    },

    /**
     * @param {String} postId 
     * Get POse by Id 
     */
    getPostById: (postId) => {
        return axios.get(config.getBaseUrl() + "post/get-post-by-post-id/" + postId).
            then(response => {
                return response
            })
            .catch({ status: 500, message: 'Internal Serevr Error' })
    },

    /**
     * @param {object} payload
     * Delete Post
     */
    deletePost: (payload) => {
        console.log("payload in delete post==========>", payload)
        return axios.delete(config.getBaseUrl() + "post/post", { data: { payload } }).
            then(response => {
                return response
            })
            .catch({ status: 500, message: 'Internal Serevr Error' })
    },

    /**
     * @param {String} userId
     * Get Post by UserId
     */
    getPostByUserId: (userId) => {
        return axios.get(config.getBaseUrl() + "post/get-post-by-id/" + userId).
            then(response => {
                return response
            })
            .catch({ status: 500, message: 'Internal Serevr Error' })
    },


    /**
     * @param {String} userId
     * get Friends Posts
     */
    getFriendsPost: (userId,pageNumber) => {
        console.log('get friend post called: ', userId);
        return axios.get(config.getBaseUrl() + "post/get-my-friends-post/" + userId + "?offset=" + pageNumber).
            then(response => {
                return response
            })
            .catch({ status: 500, message: 'Internal Serevr Error' })
    },

    /**
     * @param {object} payload
     * send post
     */
    sendPost: (payload) => {
        return axios.post(config.getBaseUrl() + "message/sharepost", payload).
            then(response => {
                return response;
            })
            .catch({ status: 500, message: 'Internal Serevr Error' })
    }

}