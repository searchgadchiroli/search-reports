import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.jdbc.core.JdbcTemplate;

import javax.sql.DataSource;
import java.util.List;
import java.util.Map;

class JDBCUtil {

    private DataSource dataSource;
    private JdbcTemplate jdbcTemplateObject;

    public void setDataSource(DataSource dataSource) {
        this.dataSource = dataSource;
        this.jdbcTemplateObject = new JdbcTemplate(dataSource);
    }

    public static JDBCUtil getJDBCTemplate() {

        ApplicationContext context =
                new ClassPathXmlApplicationContext("test-db.xml");

        return (JDBCUtil) context.getBean("jdbcUtil");
    }

    public List<Map<String, Object>> execute(String sql) {
        List<Map<String, Object>> queryResult = jdbcTemplateObject.queryForList(sql);
        return queryResult;
    }

}
