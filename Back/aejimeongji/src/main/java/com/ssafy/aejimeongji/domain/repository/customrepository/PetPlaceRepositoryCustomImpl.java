package com.ssafy.aejimeongji.domain.repository.customrepository;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.aejimeongji.domain.condition.PetPlaceSearchCondition;
import com.ssafy.aejimeongji.domain.entity.PetPlace;
import com.ssafy.aejimeongji.domain.util.Direction;
import com.ssafy.aejimeongji.domain.util.GeometryUtil;
import com.ssafy.aejimeongji.domain.util.Location;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.util.StringUtils;

import javax.persistence.EntityManager;
import java.util.List;

import static com.ssafy.aejimeongji.domain.entity.QPetPlace.petPlace;

@Slf4j
@RequiredArgsConstructor
public class PetPlaceRepositoryCustomImpl implements PetPlaceRepositoryCustom {

    private final JPAQueryFactory queryFactory;
    private final EntityManager em;

    @Override
    public Slice<PetPlace> searchPetPlaceAll(PetPlaceSearchCondition condition, Long curLastIdx, PageRequest request) {
        List<PetPlace> result;
        boolean hasNext;

        if (condition.getLat() != null && condition.getLng() != null && condition.getDist() != null) {
            result = getNearPetPlaces(condition, curLastIdx, request);
        } else {
            result = PetPlaceSearch(condition, curLastIdx, request);
        }
        hasNext = result.size() > request.getPageSize() ? true : false;
        return new SliceImpl(result, request, hasNext);
    }

    private List<PetPlace> PetPlaceSearch(PetPlaceSearchCondition condition, Long curLastIdx, PageRequest request) {
        List<PetPlace> result;
        result = queryFactory.selectFrom(petPlace)
                .where(getCategoryEq(condition.getCategory()), getIdxLt(curLastIdx))
                .offset(request.getOffset())
                .limit(request.getPageSize() + 1)
                .orderBy(petPlace.id.desc())
                .fetch();
        return result;
    }

    private List<PetPlace> getNearPetPlaces(PetPlaceSearchCondition condition, Long curLastIdx, PageRequest request) {
        List<PetPlace> result;
        Location northEast = GeometryUtil.calculate(condition.getLat(), condition.getLng(), condition.getDist(), Direction.NORTHEAST.getBearing());
        Location southWest = GeometryUtil.calculate(condition.getLat(), condition.getLng(), condition.getDist(), Direction.SOUTHWEST.getBearing());

        double x1 = northEast.getLatitude();
        double y1 = northEast.getLongitude();
        double x2 = southWest.getLatitude();
        double y2 = southWest.getLongitude();

        String sql = "SELECT * FROM petplace AS p WHERE MBRContains(ST_LINESTRINGFROMTEXT(" + String.format("'LINESTRING(%f %f, %f %f)')", x1, y1, x2, y2) + ", p.point) ";

        sql += String.format("and p.id < %d ", curLastIdx);

        if (StringUtils.hasText(condition.getCategory()))
            sql += String.format("and p.category like '%s' ", condition.getCategory());

        sql += String.format("ORDER BY id DESC LIMIT %d, %d", request.getOffset(), request.getPageSize() + 1);

        result = em.createNativeQuery(sql, PetPlace.class).getResultList();

        return result;
    }

    private BooleanExpression getIdxLt(Long curLastIdx) {
        return curLastIdx != null ? petPlace.id.lt(curLastIdx) : null;
    }

    private BooleanExpression getCategoryEq(String category) {
        return !category.isBlank() ? petPlace.category.eq(category) : null;
    }
}
