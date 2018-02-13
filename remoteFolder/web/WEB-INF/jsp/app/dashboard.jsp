<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ax" tagdir="/WEB-INF/tags" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<ax:set key="axbody_class" value="screen"/>

<ax:layout name="app">

    <jsp:attribute name="script">
        <ax:script-lang key="ax.script" var="LANG" />
        <script type="text/javascript" src="<c:url value='/assets/js/view/app-view-dashboard.js' />"></script>
	</jsp:attribute>

    <jsp:body>

        <section id="map" class="cave01">
            <h1><p>거문오름용암동굴계</p>
                <small>현재시각
                    <strong ax-view-id="time">AM 00:00:00</strong>
                </small>
            </h1>

            <nav class="viewSub">
                <button type="button" onclick="location.href='${pageContext.request.contextPath}/app/dashboard/detail';">동굴별 상세보기</button>
                <button type="button" onclick="location.href='${pageContext.request.contextPath}/app/dashboard/detail';">센서종류별 상세보기</button>
                <button type="button" onclick="location.href='${pageContext.request.contextPath}/app/dashboard/detail';">CCTV 전체보기</button>
            </nav>

            <div class="cavebtn">
                <c:forEach items="${caveList}" var="cave" varStatus="status">
                    <button data="${cave.caveId}" class="cave ${cave.caveId} <c:if test="${status.first}">active</c:if>">${cave.caveNm}</button>
                </c:forEach>
            </div>

            <ul class="alert"></ul>

        </section>

        <section class="tabdata">
            <h1 class="sr-only">동굴별 데이터</h1>

            <nav>
                <c:forEach items="${caveList}" var="cave" varStatus="status">
                    <button data="${cave.caveId}" class="cave cave<fmt:formatNumber value="${status.count}" pattern="00"/> <c:if test="${status.first}">active</c:if>">${cave.caveNm}</button>
                </c:forEach>
            </nav>

            <c:forEach items="${caveList}" var="cave" varStatus="status">
                <div data="${cave.caveId}" class="cavedata cave<fmt:formatNumber value="${status.count}" pattern="00"/> <c:if test="${status.first}">active</c:if>">
                    <ul class="subtab">
                        <%----%>
                        <li>
                            <input name="${cave.caveId}" id="all_${cave.caveId}" data-rtuId="" type="radio" checked="checked">
                            <label for="all_${cave.caveId}">전체</label>
                        </li>

                        <c:forEach items="${cave.gwPlcMsts}" var="gw" varStatus="status">
                            <c:forEach items="${gw.rtuMsts}" var="rtuMst" varStatus="status">
                                <li>
                                    <input name="${cave.caveId}" id="${rtuMst.rtuId}" data-rtuId="${rtuMst.rtuId}" type="radio"<%-- <c:if test="${status.first}">checked="checked"</c:if>--%>>
                                    <label for="${rtuMst.rtuId}">${rtuMst.instLocCmnt}</label>
                                </li>
                            </c:forEach>
                        </c:forEach>
                    </ul>
                    <h2 class="sr-only">${cave.caveNm} 실시간 센서값</h2>
                    <div class="nowdata">

                    </div>

                    <c:forEach varStatus="status" begin="0" end="1">
                        <div class="chart" index="${status.index}" chart-view="${cave.caveId}"></div>
                    </c:forEach>
                </div>
            </c:forEach>

        </section>

        <section class="cctv">
            <h1 class="sr-only">cctv 모니터링</h1>
        </section>

    </jsp:body>
</ax:layout>