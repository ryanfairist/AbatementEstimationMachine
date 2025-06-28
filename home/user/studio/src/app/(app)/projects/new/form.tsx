<FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Zip Code</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. 12345 or 12345-6789" {...field} pattern="^\d{5}(?:[-\s]\d{4})?$" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />