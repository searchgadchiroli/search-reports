import org.joda.time.DateTime;
import org.w3c.dom.Document;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import java.io.File;

class XMLParseUtil {
    static final String DATE_TIME_FORMAT = "YYYY-MM-dd HH:mm:ss";
    public static final String XMLFromDate = "\\$P\\{from_date}";
    public static final String XMLToDate = "\\$P\\{to_date}";
    public static final String SINGLE_QUOTE = "'";

    public static String readSQLFromXMl(File XMLFile)  {
        DocumentBuilderFactory documentBuilderFactory = DocumentBuilderFactory.newInstance();
        DocumentBuilder documentBuilder;
        Document document = null;
        try {
            documentBuilder = documentBuilderFactory.newDocumentBuilder();
            document = documentBuilder.parse(XMLFile);
        } catch (Exception e) {
            e.printStackTrace();
        }
        assert document != null;
        String sql = getQueryFromXML(document);
        sql = cleanUpSql(sql);
        return sql;

    }

    private static String getQueryFromXML(Document document) {
        return document.getElementsByTagName("queryString").item(0).getTextContent();
    }

    private static String cleanUpSql(String sql) {
        sql = sql.replaceAll("\t", " ");
        sql = sql.replaceAll("\n", " ");
        return sql;
    }

    public static String replaceDateTags(DateTime fromDate, DateTime toDate, String sql) {
        String from = fromDate.toString(DATE_TIME_FORMAT);
        String to = toDate.toString(DATE_TIME_FORMAT);
        sql = sql.replaceAll(XMLFromDate, SINGLE_QUOTE + from + SINGLE_QUOTE);
        sql = sql.replaceAll(XMLToDate, SINGLE_QUOTE + to + SINGLE_QUOTE);
        return sql;
    }
}


