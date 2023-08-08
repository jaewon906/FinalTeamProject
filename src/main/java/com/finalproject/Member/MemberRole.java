package com.finalproject.Member;

import lombok.Getter;

@Getter
public enum MemberRole {
    USER("USER"), ADMIN("ADMIN");

    private final String roleName;

    MemberRole(String roleName) {
        this.roleName = roleName;
    }

}
