<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ax" tagdir="/WEB-INF/tags" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<ax:set key="axbody_class" value="index"/>

<ax:layout name="app">

    <jsp:attribute name="script">
        <ax:script-lang key="ax.script" var="LANG" />
        <script type="text/javascript" src="<c:url value='/assets/js/view/app-view-main.js' />"></script>
	</jsp:attribute>

    <jsp:body>

        <ax:header layout="app"/>

        <!-- S:content -->
        <div id="content">
            <article class="issue">
                <div class="container">
                    <ul class="slider">
                        <c:forEach items="${caveList}" var="cave" varStatus="status">
                            <%--<button data="${cave.caveId}" class="cave cave<fmt:formatNumber value="${status.count}" pattern="00"/> <c:if test="${status.first}">active</c:if>">${cave.caveNm}</button>--%>
                            <li data="${cave.caveId}">
                                <h2>${cave.caveNm}</h2>
                                <div class="nowdata">
                                    <p>온도<strong>-10<u>℃</u>
                                    </strong>
                                        <i>정상범주 18℃ ~ 22℃</i>
                                    </p>
                                    <p>습도<strong>0.01<u>%</u>
                                    </strong>
                                        <i>정상범주 60% ~ 99%</i>
                                    </p>
                                    <p>CO2<strong>20<u>ppm</u>
                                    </strong>
                                        <i>정상범주 30ppm ~ 50ppm</i>
                                    </p>
                                </div>
                                <a href="#">상세 데이터 보기</a>
                            </li>
                        </c:forEach>
                    </ul>

                    <div class="map">
                        <c:forEach items="${caveList}" var="cave" varStatus="status">
                            <!--
                            ${cave}
                            -->
                            <button data="${cave.caveId}" data-num="${status.index}" class="cave ${cave.caveId} <c:if test="${status.first}">active</c:if>">${cave.caveNm}</button>
                        </c:forEach>
                    </div>

                    <button class="btn issuePrev">
                        <i class="icon-angle-left"></i>이전</button>
                    <button class="btn issueNext">
                        <i class="icon-angle-right"></i>다음</button>
                </div>
            </article>

            <div class="main-info">
                <div class="container">
                    <section class="notice">
                        <h2>
                            <a href="${pageContext.request.contextPath}/app/board/NOTICE">공지사항</a>
                        </h2>
                        <ul>
                            <c:forEach items="${notice}" var="bbs" varStatus="status">
                                <fmt:parseDate var="dateString" value="${bbs.frstRegistPnttm}" pattern="yyyy-MM-dd'T'HH:mm:ss" />
                                <li><%--${bbs}--%>
                                    <a href="${pageContext.request.contextPath}/app/board/${bbs.comtnbbsmaster.bbsId}/${bbs.nttId}">
                                        <i><fmt:formatDate value="${dateString}" pattern="yyyy.MM.dd" /></i>
                                        ${bbs.nttSj}
                                    </a>
                                </li>
                            </c:forEach>

                        </ul>
                    </section>
                    <section class="banner">
                        <a class="cctv" href="/app/cctv">CCTV 바로가기</a>
                        <a class="unesco" target="_blank" href="http://jejuwnh.jeju.go.kr/main.do">
                            <u>제주</u>세계자연유산센터</a>
                    </section>
                </div>
            </div>

        </div>
        <!-- E:content -->

        <ax:footer layout="app"/>
    </jsp:body>
</ax:layout>