package com.ssafy.aejimeongji.domain.member.application.mapper;

import com.ssafy.aejimeongji.domain.common.application.mapper.StructMapper;
import com.ssafy.aejimeongji.domain.member.application.dto.MemberDto;
import com.ssafy.aejimeongji.domain.member.domain.Member;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface MemberMapper extends StructMapper<MemberDto, Member> {
    MemberMapper INSTANCE = Mappers.getMapper(MemberMapper.class);
}
