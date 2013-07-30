use openmrs;

SELECT
pi.identifier registration_number,
concat(pn.given_name, ' ', pn.family_name) as name,
(YEAR(e.encounter_datetime)-YEAR(p.birthdate)) - (RIGHT(e.encounter_datetime,5) < RIGHT(p.birthdate,5)) AS age,
(CASE WHEN p.gender = 'M' THEN 'Male' ELSE 'Female' END) as gender,
sum(case when cn.name = 'HEIGHT' then o.value_numeric else 0 end) as height,
sum(case when cn.name = 'WEIGHT' then o.value_numeric else 0 end) as weight,
sum(case when cn.name = 'REGISTRATION FEES' then o.value_numeric else 0 end) as regFees,
concat(case when cn.name = 'COMMENTS' then o.value_text else '' end) as comments,
e.date_created as encounter_date,
e.visit_id as visit_id,
pi.patient_id as patient_id,
(select max(vi.visit_id) from visit vi where vi.patient_id = e.patient_id) as max_visit_id,
(select max(date_started)
	from visit v where v.patient_id = e.patient_id
	and v.visit_id <> e.visit_id
	and date(v.date_created) < date(e.date_created)
) last_visit
from encounter e
left outer join obs o on e.encounter_id = o.encounter_id and o.voided = 0
left outer join patient_identifier pi on e.patient_id = pi.patient_id and pi.preferred = 1 and pi.voided = 0
left outer join person_name pn on e.patient_id = pn.person_id and pn.voided = 0 and pn.preferred = 0
left outer join concept_name cn on o.concept_id = cn.concept_id
	and concept_name_type = 'FULLY_SPECIFIED'
	and cn.voided = 0
left outer join visit v on e.visit_id = v.visit_id
left outer join person p on p.person_id = e.patient_id
JOIN person_attribute pa ON pa.person_id = pn.person_id
JOIN person_attribute_type pat ON pa.person_attribute_type_id = pat.person_attribute_type_id AND pat.name = 'healthCenter'
where date(e.encounter_datetime) = '2013-07-05'
group by e.visit_id,
		pi.identifier,
		pi.patient_id,
		concat(pn.given_name, ' ', pn.family_name, e.date_created),
		(select max(v.visit_id) max_visit_id from visit v where v.patient_id = e.patient_id),
		(select max(date_started)
		from visit v where v.patient_id = e.patient_id
		and v.visit_id <> e.visit_id
		and date(v.date_created) < date(e.date_created)
	)
having max_visit_id = visit_id;