package com.kdt.BookVoyage.Board;

import lombok.AllArgsConstructor;
import lombok.Data;


@Data
@AllArgsConstructor
public class WrapperClass<E> {

    private E data;

}
/**
 * WrapperClass<E>

 WrapperClass는 제네릭 클래스로, 제네릭 타입 E를 허용하는 클래스입니다.
 data 필드를 가지며, 이 필드는 E 타입의 데이터를 보관합니다.
 위의 코드에서 WrapperClass는 게시글 목록이나 게시글 상세 정보를 API 응답으로 보낼 때, 응답 데이터를 래핑하는 데 사용됩니다.

 즉, API 응답의 데이터를 WrapperClass 객체로 감싸서 전달합니다. 이를 통해 응답 데이터에 추가적인 메타 정보를 포함시키거나, 일관된 응답 형식을 유지할 수 있습니다.
 BoardController에서는 board_list()와 board_detail() 메서드에서 WrapperClass를 사용하여 게시글 데이터를 래핑하여 반환합니다.
 이렇게 함으로써 프론트엔드에게 일관된 응답 형식을 제공하고, 필요한 메타 정보를 포함시키는 장점을 가질 수 있습니다.
 */
