export interface UserType {
    _id: string;
    name: string;
    email: string;
    authMethod: string;
}
export interface AuthResponse {
    data: {
        token?: string;
        user: UserType;
    };
}

export interface TopicType {
    _id: string;
    slug: string;
    topicName: string;
    totalQuestions: number;
    completedQuestions: number;
}
export interface getTopicsApiResp {
    data: TopicType[];
}

export interface TopicQuestionType {
    _id: string;
    slug: string;
    title: string;
    solution: string[];
}
export interface getTopicQuestionsApiResp {
    data: TopicQuestionType[]
}