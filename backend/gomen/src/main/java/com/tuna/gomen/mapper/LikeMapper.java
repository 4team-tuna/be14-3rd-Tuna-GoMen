package com.tuna.gomen.mapper;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface LikeMapper {
    int getLikeCountByPostId(int postId);
}
