import com.github.springtestdbunit.annotation.DatabaseOperation;
import com.github.springtestdbunit.annotation.DatabaseSetup;
import com.github.springtestdbunit.annotation.DatabaseTearDown;
import org.joda.time.DateTime;
import org.junit.Before;
import org.junit.Test;

import java.io.File;
import java.sql.Timestamp;
import java.util.List;
import java.util.Map;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;

public class TotalTestsPerPatientAndAbnormalResultsTest extends DbUnitConfig {

    String sql;
    JDBCUtil jdbcUtil;

    @Before
    public void setUp() throws Exception {
        File file = new File("./jrxml/Total_Tests_Per_Patient_And_Abnormal_Results_jrxml.data.jrxml");
        sql = XMLParseUtil.readSQLFromXMl(file);
        jdbcUtil = JDBCUtil.getJDBCTemplate();

    }

    @Test
    @DatabaseSetup(value = "Total_Tests_Per_Patient_For_A_Day.xml", type = DatabaseOperation.INSERT)
    @DatabaseTearDown(value = "Total_Tests_Per_Patient_For_A_Day.xml", type = DatabaseOperation.DELETE)
    public void shouldReturnAllFinalizedTestsForGivenDay() throws Exception {
        sql = XMLParseUtil.withDates(new DateTime(2010, 9, 17, 0, 0), new DateTime(2010, 9, 17, 0, 0), sql);

        List<Map<String, Object>> results = jdbcUtil.execute(sql);

        assertThat(results.size(), is(2));
        assertThat((Timestamp) results.get(0).get("date"), is(new Timestamp(new DateTime(2010, 9, 17, 0, 0).getMillis())));
        assertThat((String) results.get(0).get("registration_number"), is("0987654321"));
        assertThat((String) results.get(0).get("test_name"), is("Leucocytes"));
        assertThat((String) results.get(0).get("abnormal_value"), is(""));

        assertThat((Timestamp) results.get(1).get("date"), is(new Timestamp(new DateTime(2010, 9, 17, 0, 0).getMillis())));
        assertThat((String) results.get(1).get("registration_number"), is("0987654321"));
        assertThat((String) results.get(1).get("test_name"), is("Leucocytes"));
        assertThat((String) results.get(1).get("abnormal_value"), is(""));
    }

    @Test
    @DatabaseSetup(value = "Total_Tests_Per_Patient_For_A_Day_With_Abnormal_Value.xml", type = DatabaseOperation.INSERT)
    @DatabaseTearDown(value = "Total_Tests_Per_Patient_For_A_Day_With_Abnormal_Value.xml", type = DatabaseOperation.DELETE)
    public void shouldReturnAllTestsWithAbnormalValueForGivenDay() throws Exception {
        sql = XMLParseUtil.withDates(new DateTime(2010, 9, 17, 0, 0), new DateTime(2010, 9, 17, 0, 0), sql);

        List<Map<String, Object>> results = jdbcUtil.execute(sql);

        assertThat(results.size(), is(3));
        assertThat((Timestamp) results.get(0).get("date"), is(new Timestamp(new DateTime(2010, 9, 17, 0, 0).getMillis())));
        assertThat((String) results.get(0).get("registration_number"), is("09876543211"));
        assertThat((String) results.get(0).get("test_name"), is("Leucocytes"));
         assertThat((String) results.get(0).get("abnormal_value"), is(""));

        assertThat((Timestamp) results.get(1).get("date"), is(new Timestamp(new DateTime(2010, 9, 17, 0, 0).getMillis())));
        assertThat((String) results.get(1).get("registration_number"), is("09876543212"));
        assertThat((String) results.get(1).get("test_name"), is("Leucocytes"));
        assertThat((String) results.get(1).get("abnormal_value"), is("POSITIVE"));

        assertThat((Timestamp) results.get(2).get("date"), is(new Timestamp(new DateTime(2010, 9, 17, 0, 0).getMillis())));
        assertThat((String) results.get(2).get("registration_number"), is("09876543213"));
        assertThat((String) results.get(2).get("test_name"), is("Leucocytes"));
        assertThat((String) results.get(2).get("abnormal_value"), is("900"));
    }

}
