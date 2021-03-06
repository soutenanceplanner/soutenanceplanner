
package com.angers.m2sili.soutenance.service.example;

import org.junit.Ignore;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

/**
 * <p> Integration test using the jpa profile. 
 * @see AbstractClinicServiceTests AbstractClinicServiceTests for more details. </p>
 *
 * @author Rod Johnson
 * @author Sam Brannen
 * @author Michael Isvy
 */

@ContextConfiguration(locations = {"classpath:spring/business-config.xml"})
@RunWith(SpringJUnit4ClassRunner.class)
// No active profile specificied because JPA uses the "default" profile
@Ignore
public class ClinicServiceJpaTests extends AbstractClinicServiceTests {

}