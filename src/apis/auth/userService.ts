import axiosBase from "@/apis/base/axiosBase";

export interface CurrentUser {
  id: number;
  userName: string;
  email: string;
}

export const UserService = {
  getCurrent: async (): Promise<CurrentUser> => {
    const response = await axiosBase.get("/user/current");
    return response.data;
  },
};
