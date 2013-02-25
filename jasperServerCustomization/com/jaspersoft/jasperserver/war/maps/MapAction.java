package com.jaspersoft.jasperserver.war.maps;
import org.springframework.webflow.action.MultiAction;
import org.springframework.webflow.execution.Event;
import org.springframework.webflow.execution.RequestContext;
public class MapAction extends MultiAction {
    public Event start(RequestContext context) throws Exception{
        // implement some logic
        return success();
    }
}