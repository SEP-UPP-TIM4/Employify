package com.company.rest.api.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonPOJOBuilder;

import java.time.LocalDate;

@JsonDeserialize(builder = Result.ResultBuilder.class)
public class Result {
    private final String p;
    private final String c;
    private final String myParameterKey;
    @JsonIgnore
    private final LocalDate currentDate = LocalDate.now();
    
    public Result(String myParameterKey, String p, String c) {
        this.myParameterKey = myParameterKey;
        this.p = p;
        this.c = c;
    }

    public String getP() {
        return p;
    }

    public String getC() {
        return c;
    }

    public String getMyParameterKey() {
        return myParameterKey;
    }

    public LocalDate getCurrentDate() {
        return currentDate;
    }

    @JsonPOJOBuilder(withPrefix = "")
    public static class ResultBuilder {
        private String p;
        private String c;
        private String myParameterKey;

        public ResultBuilder p(String p) {
            this.p =  p;
            return this;
        }

        public ResultBuilder c(String c) {
            this.c =  c;
            return this;
        }

        public ResultBuilder myParameterKey(String myParameterKey) {
            this.myParameterKey =  myParameterKey;
            return this;
        }

        public Result build() {
            return new Result(myParameterKey, p, c);
        }
    }

    public static ResultBuilder builder() {
        return new ResultBuilder();
    }
}

