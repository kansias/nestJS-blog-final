import React, { useEffect, useState } from "react";
import { useAuth } from "../app/util/AuthContext";
import axios from "axios";

export function CategoryList() {
  const { user } = useAuth();
  const userId = user && user.body[0].id;

  useEffect(() => {
    const categoryList = async () => {
      try {
        const res = await axios.get("/api/category/list", {
          params: { userId },
        });

        if (res.status === 200) {
          console.log(res.data.body);
          setCategories(res.data.body);
        }
      } catch (error) {
        if (error.response) {
          alert(error.response.data.msg);
        }
      }
    };

    if (userId) {
      categoryList();
    }
  }, [userId]);

  return null;
}
