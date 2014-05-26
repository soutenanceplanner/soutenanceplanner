/*
 * Copyright 2002-2013 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.angers.m2sili.soutenance.service.example.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.angers.m2sili.soutenance.model.example.Owner;
import com.angers.m2sili.soutenance.repository.example.OwnerRepository;
import com.angers.m2sili.soutenance.service.example.ClinicService;

/**
 * Mostly used as a facade for all Petclinic controllers
 * Also a placeholder for @Transactional and @Cacheable annotations
 *
 * @author Michael Isvy
 */
@Service
public class ClinicServiceImpl implements ClinicService {

	@Autowired
    private OwnerRepository ownerRepository;
	

    @Override
    @Transactional(readOnly = true)
    public Owner findOwnerById(Integer id) throws DataAccessException {
        return ownerRepository.findOne(id);
    }

    @Override
    @Transactional
    public void saveOwner(Owner owner) throws DataAccessException {
        ownerRepository.save(owner);
    }

}
