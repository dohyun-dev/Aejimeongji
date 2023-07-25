package com.ssafy.aejimeongji.domain.auth.application.util;

import com.ssafy.aejimeongji.domain.member.domain.Member;
import io.jsonwebtoken.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import java.util.Base64;
import java.util.Date;

@Component
@Slf4j
public class  TokenProvider {

    private String secretKey;

    public TokenProvider(@Value("${jwt.secretKey}") String secretKey) {
        this.secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    }

    public String createAccessToken(Member member) {
        Claims claims = Jwts.claims().setSubject(member.getId().toString());
        claims.put("memberId", member.getId());
        claims.put("email", member.getEmail());
        claims.put("role", member.getRole());
        Date now = new Date();
        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + JwtProperties.accessTokenValidTime))
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }

    public String createRefreshToken(Member member) {
        Claims claims = Jwts.claims().setSubject(member.getId().toString());
        Date now = new Date();
        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + JwtProperties.refreshTokenValidTime))
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }

    public String getMemberId(String token) {
        return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().get("memberId").toString();
    }

    public Claims getClaims(String token) {
        return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody();
    }

    public String resolveToken(HttpServletRequest request) {
        return request.getHeader("Authorization");
    }

    public boolean validateToken(String jwtToken) {
        try {
            Jws<Claims> claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(jwtToken);
            return !claims.getBody().getExpiration().before(new Date());
        } catch (Exception e) {
            return false;
        }
    }
}
