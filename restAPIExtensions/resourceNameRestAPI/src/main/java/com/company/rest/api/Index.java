package com.company.rest.api;

import com.company.rest.api.dto.Result;
import com.company.rest.api.exception.ValidationException;

import org.bonitasoft.web.extension.rest.RestAPIContext;
import java.util.Properties;
import javax.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import static java.lang.String.format;

/**
 * Controller class
 */
public class Index extends AbstractIndex {
    
    private static final Logger LOGGER = LoggerFactory.getLogger(Index.class.getName());

    /**
     * Ensure request is valid
     *
     * @param request the HttpRequest
     */
    @Override
    public void validateInputParameters(HttpServletRequest request) {
        // To retrieve query parameters use the request.getParameter(..) method.
        // Be careful, parameter values are always returned as String values

        // Retrieve p parameter
        String p = request.getParameter(PARAM_P);
        if (p == null) {
            throw new ValidationException(format("the parameter %s is missing", PARAM_P));
        }
        // Retrieve c parameter
        String c = request.getParameter(PARAM_C);
        if (c == null) {
            throw new ValidationException(format("the parameter %s is missing", PARAM_C));
        }

    }

    /**
     * Execute business logic
     *
     * @param context
     * @param p
     * @param c
     * @return Result
     */
    @Override
    protected Result execute(RestAPIContext context, String p, String c) {

        // Here is an example of how you can retrieve configuration parameters from a properties file
        // It is safe to remove this if no configuration is required
        Properties props = loadProperties("configuration.properties", context.getResourceProvider());
        String paramValue = props.getProperty(MY_PARAMETER_KEY);

        LOGGER.debug(format("Execute rest api call with params:  %s, %s, %s",  p,  c,  paramValue));

        /*
         * TODO: Execute business logic here, your code goes here
         */

        // Prepare the result
        return Result.builder()
                .p(p)
                .c(c)
                .myParameterKey(paramValue)
                .build();
    }
}