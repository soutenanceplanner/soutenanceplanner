package com.angers.m2sili.soutenance.web.gson;

import java.lang.reflect.Type;
import java.sql.Timestamp;
import java.util.Date;

import org.springframework.stereotype.Component;

import com.google.gson.*;

@Component
public class GsonParser {
	
	public static Gson getParser(){
		GsonBuilder builder = new GsonBuilder();

		// Register an adapter to manage the date types as long values
		builder.registerTypeAdapter(Date.class,
				new JsonDeserializer<Date>() {
					@Override
					public Date deserialize(JsonElement json, Type t,
							JsonDeserializationContext context)
							throws JsonParseException {
						return new Date(json.getAsJsonPrimitive()
								.getAsLong());
					}
				});
		builder.registerTypeAdapter(Timestamp.class,
				new JsonDeserializer<Timestamp>() {
					@Override
					public Timestamp deserialize(JsonElement json,
							Type typeOfT, JsonDeserializationContext context)
							throws JsonParseException {
						long time = Long.parseLong(json.getAsString());
						return new Timestamp(time);
					}
				});
		
		return builder.create();
	}

}
